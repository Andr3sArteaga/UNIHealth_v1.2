import re

# Read the file
with open('screens/Regsiter.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with "await api.post('/patients'," and insert medical data saving after it
medical_data_code = '''
      const patientResponse = await api.post('/patients', {
        firstName,
        lastName,
        phone: form.phone,
        dob: dobISO,
        gender: form.biologicalSex || 'O',
      });

      const patientId = patientResponse.data.id;

      // 4. Save Medical Data
      const medicalPromises = [];

      // Chronic Diseases
      if (form.chronicDiseases.length > 0) {
        form.chronicDiseases.forEach((disease) => {
          medicalPromises.push(
            api.post('/medical-history', {
              patientId,
              condition: disease,
              type: 'fisico',
              notes: 'Reportado durante registro',
            })
          );
        });
      }

      // Surgeries
      if (form.surgeries) {
        medicalPromises.push(
          api.post('/medical-history', {
            patientId,
            condition: form.surgeries,
            type: 'cirugia',
            notes: 'Cirugías previas',
          })
        );
      }

      // Allergies
      if (form.allergies) {
        medicalPromises.push(
          api.post('/medical-history/allergies', {
            patientId,
            allergen: form.allergies,
            severity: 'media',
            reaction: 'No especificada'
          })
        );
      }

      // Medications
      if (form.medications.length > 0) {
        form.medications.forEach((med) => {
          medicalPromises.push(
            api.post('/medical-history/medications', {
              patientId,
              name: med,
              dosage: 'No especificada',
              frequency: 'No especificada',
              startDate: new Date().toISOString().split('T')[0],
            })
          );
        });
      }

      // Family History
      if (form.familyHistory.length > 0) {
        form.familyHistory.forEach((item) => {
          medicalPromises.push(
            api.post('/medical-history/family-history', {
              patientId,
              condition: item,
              relationship: 'Familiar',
            })
          );
        });
      }

      // Lifestyle
      if (form.smokingHabit || form.alcoholConsumption || form.physicalActivity) {
        medicalPromises.push(
          api.post('/medical-history/lifestyle', {
            patientId,
            smokingHabit: form.smokingHabit || 'No',
            alcoholConsumption: form.alcoholConsumption || 'No',
            activityLevel: form.physicalActivity || 'Sedentario',
            diet: 'No especificada'
          })
        );
      }

      await Promise.all(medicalPromises);
'''

# Read the content
with open('screens/Regsiter.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the patient creation section
old_pattern = r'''await api\.post\('/patients', \{
        firstName,
        lastName,
        phone: form\.phone,
        dob: dobISO,
        gender: form\.biologicalSex \|\| 'O',
        // Add other fields if backend supports them or update backend DTO
      \}\);'''

content = re.sub(old_pattern, medical_data_code.strip(), content, flags=re.DOTALL)

# Write back
with open('screens/Regsiter.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully!")
print("Added: Medical data saving logic (chronic diseases, medications, allergies, surgeries, family history, lifestyle)")
