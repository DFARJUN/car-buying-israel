#!/usr/bin/env python3
"""Read-only local projection of the agent's comparison file."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import json

root = Path(__file__).resolve().parents[1]
allowed = {'/app/', '/app/index.html', '/app/app.mjs', '/app/model.mjs', '/app/style.css', '/examples/comparison.json'}

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs': 'text/javascript'}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(root), **kwargs)

    def json_response(self, value, status=200):
        body = json.dumps(value, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(body)
        return None

    def send_head(self):
        port = self.server.server_port
        if self.headers.get('Host') not in {f'127.0.0.1:{port}', f'localhost:{port}'}:
            self.send_error(403)
            return None
        path = unquote(urlsplit(self.path).path)
        if path == '/api/comparison':
            file = self.server.data_path
            if not file.exists():
                return self.json_response({'connected': False})
            try:
                if file.stat().st_size > 2_000_000:
                    raise ValueError('The comparison file exceeds 2 MB')
                data = json.loads(file.read_text(encoding='utf-8'))
                return self.json_response({'connected': True, 'demo': file == (root/'examples/comparison.json').resolve(), 'data': data})
            except (OSError, ValueError):
                return self.json_response({'error': 'The agent file cannot be read yet. Keeping the last valid summary.'}, 503)
        if path == '/':
            self.send_response(302)
            self.send_header('Location', '/app/')
            self.end_headers()
            return None
        if path not in allowed:
            self.send_error(404)
            return None
        resolved = (root / path.lstrip('/')).resolve()
        if not resolved.is_relative_to(root):
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
        super().end_headers()

    def log_message(self, fmt, *args):
        if '/api/comparison' not in str(args):
            super().log_message(fmt, *args)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8772)
    parser.add_argument('--data', type=Path, default=root/'my-car/comparison.json')
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    server.data_path = args.data.resolve()
    print(f'Open http://127.0.0.1:{args.port}/app/ - Ctrl+C to stop', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
