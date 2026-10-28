import importlib.util
import json
from pathlib import Path
import tempfile
import threading
import unittest
from urllib.request import Request, urlopen
from urllib.error import HTTPError

spec=importlib.util.spec_from_file_location('car_server',Path(__file__).resolve().parents[1]/'tools/serve.py')
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp=tempfile.TemporaryDirectory(prefix='car-server-test-')
        cls.data=Path(cls.tmp.name)/'comparison.json'
        cls.server=module.ThreadingHTTPServer(('127.0.0.1',0),module.Handler)
        cls.server.data_path=cls.data
        cls.thread=threading.Thread(target=cls.server.serve_forever,daemon=True)
        cls.thread.start()
        cls.url=f'http://127.0.0.1:{cls.server.server_port}'

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown();cls.server.server_close();cls.thread.join();cls.tmp.cleanup()

    def test_live_file_updates(self):
        for name in ('first','second'):
            self.data.write_text(json.dumps({'marker':name}))
            with urlopen(self.url+'/api/comparison') as response:
                self.assertEqual(json.load(response)['data']['marker'],name)
                self.assertEqual(response.headers['Cache-Control'],'no-store')

    def test_missing_file(self):
        self.data.unlink(missing_ok=True)
        with urlopen(self.url+'/api/comparison') as response:
            self.assertFalse(json.load(response)['connected'])

    def test_invalid_file_has_explicit_failure(self):
        self.data.write_text('{')
        with self.assertRaises(HTTPError) as error:
            urlopen(self.url+'/api/comparison')
        self.assertEqual(error.exception.code,503)

    def test_private_paths_not_served(self):
        for path in ('/my-car/comparison.json','/AGENTS.md','/.git/config','/app/../README.md'):
            with self.assertRaises(HTTPError) as error:
                urlopen(self.url+path)
            self.assertEqual(error.exception.code,404)

    def test_rebinding_host_blocked(self):
        with self.assertRaises(HTTPError) as error:
            urlopen(Request(self.url+'/api/comparison',headers={'Host':'attacker.invalid'}))
        self.assertEqual(error.exception.code,403)

if __name__=='__main__':
    unittest.main()
