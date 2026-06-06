import subprocess

def run_diff():
    result = subprocess.run(['git', 'diff', 'fbea483~1', 'fbea483'], capture_output=True, text=True, encoding='utf-8')
    with open('d:/3-2/scratch/diff.txt', 'w', encoding='utf-8') as f:
        f.write(result.stdout)
    print("Diff saved successfully to scratch/diff.txt")

if __name__ == '__main__':
    run_diff()
