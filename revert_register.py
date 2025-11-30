import re

# Read the file
with open('screens/Regsiter.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Revert back to /auth/register
content = content.replace("await api.post('/users',", "await api.post('/auth/register',")

# Write back
with open('screens/Regsiter.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("File reverted successfully!")
print("Changed back: /users -> /auth/register")
