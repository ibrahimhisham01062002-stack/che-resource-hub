import sys

def check_balance(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    lines = content.split('\n')
    
    # We want to track line numbers for each opening brace/bracket/parenthesis
    open_stack = [] # contains tuples of (char, line_idx, col_idx)
    
    in_string = False
    string_char = None
    in_comment = False
    in_multiline_comment = False
    
    i = 0
    line_num = 1
    col_num = 1
    
    while i < len(content):
        char = content[i]
        
        # Handle newlines
        if char == '\n':
            line_num += 1
            col_num = 1
            i += 1
            continue
        
        # Handle string literals and comments to avoid matching braces inside them
        if in_multiline_comment:
            if i + 1 < len(content) and content[i:i+2] == '*/':
                in_multiline_comment = False
                i += 2
                col_num += 2
                continue
            i += 1
            col_num += 1
            continue
        
        if in_comment:
            if char == '\n':
                in_comment = False
            i += 1
            col_num += 1
            continue
            
        if in_string:
            if char == '\\': # skip escaped char
                i += 2
                col_num += 2
                continue
            if char == string_char:
                in_string = False
            i += 1
            col_num += 1
            continue
            
        # Check comment starts
        if i + 1 < len(content):
            if content[i:i+2] == '//':
                in_comment = True
                i += 2
                col_num += 2
                continue
            elif content[i:i+2] == '/*':
                in_multiline_comment = True
                i += 2
                col_num += 2
                continue
                
        # Check string starts
        if char in ("'", '"', '`'):
            in_string = True
            string_char = char
            i += 1
            col_num += 1
            continue
            
        if char in ('(', '{', '['):
            open_stack.append((char, line_num, col_num))
        elif char in (')', '}', ']'):
            if not open_stack:
                print(f"Error: Unmatched closing '{char}' at line {line_num}, col {col_num}")
                return False
            last_open, o_line, o_col = open_stack.pop()
            if mapping[char] != last_open:
                print(f"Error: Mismatched '{char}' at line {line_num}, col {col_num}. Expected match for '{last_open}' from line {o_line}, col {o_col}")
                return False
        
        i += 1
        col_num += 1
        
    if open_stack:
        print("Error: Unclosed braces/parentheses remaining at end of file:")
        for char, line, col in open_stack[-5:]:
            print(f"  Unclosed '{char}' at line {line}, col {col}")
        return False
        
    print("Success: All braces, parentheses, and brackets are perfectly balanced!")
    return True

if __name__ == '__main__':
    check_balance('d:/3-2/frontend/app.js')
