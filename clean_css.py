import re

def clean_css():
    with open('public/game/game.css', 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove main tutorial block
    # from /* ==== TUTORIAL ==== */ up to but not including @keyframes mergeScale
    pattern1 = r'/\*\s*═══════════════════════════════════════════\s*TUTORIAL\s*═══════════════════════════════════════════\s*\*/.*?(@keyframes mergeScale)'
    content = re.sub(pattern1, r'\1', content, flags=re.DOTALL)

    # Remove media query block
    pattern2 = r'\s*#tutorial-hand\s*\{[^}]*\}\s*#tutorial-bubble\s*\{[^}]*\}\s*#tutorial-bubble::after\s*\{[^}]*\}'
    content = re.sub(pattern2, '', content, flags=re.DOTALL)

    with open('public/game/game.css', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    clean_css()
