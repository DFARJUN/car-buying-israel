#!/usr/bin/env python3
"""Small dependency-free package check, not a substitute for behavioral review."""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
errors=[]
skills=list((root/'skills').glob('*/SKILL.md'))
for path in skills:
    text=path.read_text()
    if not text.startswith('---\n') or text.count('---')<2:
        errors.append(f'Invalid frontmatter: {path}')
    if f'name: {path.parent.name}\n' not in text or not re.search(r'^description: .+',text,re.M):
        errors.append(f'Invalid name/description: {path}')
    if re.search('[\u0590-\u05ff]',text):
        errors.append(f'Skill instructions must be English: {path}')
for path in [root/'README.md',root/'CONTRIBUTING.md',*root.glob('docs/*.md')]:
    for link in re.findall(r'\]\(([^)]+)\)',path.read_text()):
        if '://' not in link and not link.startswith('#') and not (path.parent/link.split('#')[0]).exists():
            errors.append(f'Broken link in {path.name}: {link}')
if not (root/'CLAUDE.md').is_symlink() or (root/'CLAUDE.md').resolve()!=root/'AGENTS.md':
    errors.append('CLAUDE.md must point to AGENTS.md')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'Package OK: {len(skills)} English skills; documentation links and instruction alias valid.')
