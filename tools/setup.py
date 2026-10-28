#!/usr/bin/env python3
"""Expose canonical skills using local directory symlinks; never edit home settings."""
from pathlib import Path
import os

root = Path(__file__).resolve().parents[1]
for parent in ('.agents', '.claude'):
    directory = root / parent
    directory.mkdir(exist_ok=True)
    target = directory / 'skills'
    if target.is_symlink() and target.resolve() == root / 'skills':
        continue
    if target.exists() or target.is_symlink():
        raise SystemExit(f'Refusing to replace existing path: {target}')
    try:
        target.symlink_to('../skills', target_is_directory=True)
    except OSError as error:
        raise SystemExit('Creating skill links requires symlink support. On Windows use WSL or enable Developer Mode. Nothing outside this repository was changed. '+str(error))
print('Skills ready for local Codex and Claude Code. Open this repository as your project.')
