import re

# Read the file
with open('screens/Regsiter.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the endpoint
content = content.replace("await api.post('/auth/register',", "await api.post('/users',")

# Remove the name line
content = re.sub(r'\s*name: form\.fullName,\s*\n', '', content)

# Write back
with open('screens/Regsiter.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully!")
print("Changed: /auth/register -> /users")
print("Removed: name: form.fullName line")
