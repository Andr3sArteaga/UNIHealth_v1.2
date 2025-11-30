import re

# Read the file
with open('screens/Regsiter.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the registration and login logic
old_pattern = r'''await api\.post\('/auth/register', \{
        email: form\.email,
        password: form\.password,      \}\);


      // 2\. Login to get token
      const loginResponse = await api\.post\('/auth/login', \{
        email: form\.email,
        password: form\.password,
      \}\);

      const \{ access_token \} = loginResponse\.data;'''

new_code = '''// 1. Register user (returns access_token directly)
      const registerResponse = await api.post('/auth/register', {
        email: form.email,
        password: form.password,
      });

      const { access_token } = registerResponse.data;'''

content = re.sub(old_pattern, new_code, content, flags=re.DOTALL)

# Write back
with open('screens/Regsiter.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully!")
print("Fixed: Registration now uses token from register response directly")
print("Removed: Unnecessary login call after registration")
