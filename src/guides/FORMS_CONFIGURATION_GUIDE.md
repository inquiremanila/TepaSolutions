# Forms Configuration Guide

## Overview
This guide covers the forms system in the Tepa Solutions website, including how to modify existing forms, add new form types, and configure form validation and submission handling.

## File Structure

### Core Form Files
```
├── src/
│   ├── components/
│   │   ├── ContactForms.tsx              # Main form component (all form types)
│   │   └── ui/
│   │       ├── form.tsx                  # React Hook Form components
│   │       ├── input.tsx                 # Input field component
│   │       ├── textarea.tsx              # Textarea component
│   │       ├── select.tsx                # Select dropdown component
│   │       ├── radio-group.tsx           # Radio button component
│   │       ├── label.tsx                 # Form label component
│   │       └── button.tsx                # Button component
│   ├── utils/
│   │   └── api.ts                        # Backend API functions
│   └── pages/
│       ├── ContactSalesPage.tsx          # Sales inquiry form page
│       ├── ContactSupportPage.tsx        # Support request form page
│       ├── ContactVolunteerPage.tsx      # Volunteer application form page
│       ├── ContactEventHostPage.tsx      # Event hosting form page
│       ├── ContactInvestorPage.tsx       # Investor inquiry form page
│       ├── ContactCareersPage.tsx        # Career application form page
│       ├── CareersPage.tsx               # Job listings with application forms
│       ├── VolunteerPage.tsx             # Volunteer opportunities with forms
│       └── EventPage.tsx                 # Event details with registration forms
```

### Database Integration
- **Backend:** Supabase (PostgreSQL)
- **Tables:** `contact_submissions`, `career_applications`, `volunteer_applications`, `event_registrations`
- **File Storage:** Supabase Storage (`tepa-images` bucket)

## Form Types & Configuration

### 1. Contact Forms (Main Component)
**File:** `src/components/ContactForms.tsx`

This is the central form component that handles 5 different form types:

```typescript
type FormType = 'sales' | 'support' | 'volunteer' | 'event-host' | 'investor';
```

#### Form Data Structure
```typescript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  jobTitle: '',
  phone: '',
  businessName: '',
  employees: '',
  location: 'Philippines',
  isCurrentClient: '',
  areaOfInterest: '',
  howCanWeHelp: '',
  message: '',
  subject: ''  // For investor forms
});
```

#### Adding New Form Fields
To add a new field to the contact forms:

1. **Update form state:**
```typescript
const [formData, setFormData] = useState({
  // ... existing fields
  newField: '',  // Add your new field here
});
```

2. **Add the input component:**
```tsx
<div className="grid gap-2">
  <Label htmlFor="newField">New Field Label</Label>
  <Input
    id="newField"
    value={formData.newField}
    onChange={(e) => updateFormData('newField', e.target.value)}
    placeholder="Enter value..."
    required
  />
</div>
```

3. **Update form submission:**
```typescript
const submissionData = {
  // ... existing data
  newField: formData.newField,
};
```

### 2. Dropdown Options Configuration

#### Areas of Interest
```typescript
const areasOfInterest = [
  'Business Automation',
  'Web Application Development',
  'Mobile App Development',
  'Website Development',
  'SEO Solutions',
  'Custom Integration',
  'Other'
];
```

#### Help Options
```typescript
const howCanWeHelp = [
  'Quote',
  'Demo',
  'Sales question'
];
```

#### Employee Ranges
```typescript
const employeeRanges = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+'
];
```

**To modify these options:** Simply edit the arrays in `ContactForms.tsx`

### 3. File Upload Configuration

#### Current Implementation
```typescript
const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  }
};
```

#### File Upload Component
```tsx
<div className="grid gap-2">
  <Label htmlFor="coverLetter">Upload Cover Letter (Optional)</Label>
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
    <input
      type="file"
      id="coverLetter"
      onChange={handleFileUpload}
      accept=".pdf,.doc,.docx"
      className="hidden"
    />
    <Button type="button" variant="outline" onClick={() => document.getElementById('coverLetter')?.click()}>
      <Upload className="w-4 h-4 mr-2" />
      Choose File
    </Button>
  </div>
</div>
```

#### File Storage Settings
**File:** `src/utils/api.ts`

```typescript
export async function uploadFile(file: File, folderPath: string = 'uploads'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folderPath}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('tepa-images')  // Bucket name
    .upload(filePath, file, {
      cacheControl: '31536000',
      upsert: false
    });
}
```

**To change file upload settings:**
- Modify `accept` attribute for allowed file types
- Change bucket name in `uploadFile` function
- Update folder path organization

## Form Validation

### 1. Built-in HTML Validation
Forms use standard HTML5 validation attributes:

```tsx
<Input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  title="Please enter a valid email address"
/>
```

### 2. React Hook Form Integration
**File:** `src/components/ui/form.tsx`

The codebase includes React Hook Form components for advanced validation:

```typescript
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";
```

#### Example Usage with Validation
```tsx
import { useForm } from "react-hook-form";

const form = useForm({
  defaultValues: {
    email: "",
    message: "",
  },
  mode: "onChange"
});

// In your component
<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    rules={{
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      }
    }}
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input placeholder="Enter your email" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### 3. Custom Validation Functions
Add custom validation in `ContactForms.tsx`:

```typescript
const validateForm = () => {
  const errors = [];
  
  if (!formData.email.includes('@')) {
    errors.push('Please enter a valid email address');
  }
  
  if (formData.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  return errors;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const validationErrors = validateForm();
  if (validationErrors.length > 0) {
    toast.error('Please fix the following errors:', {
      description: validationErrors.join(', ')
    });
    return;
  }
  
  // Continue with submission...
};
```

## Backend API Configuration

### 1. Contact Form Submission
**File:** `src/utils/api.ts`

```typescript
export async function submitContactForm(data: {
  type: 'sales' | 'support' | 'volunteer' | 'event-host' | 'investor';
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  subject?: string;
  priority?: 'low' | 'medium' | 'high';
  supportType?: string;
  attachedFiles?: number;
}) {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([{
      type: data.type,
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      message: data.message,
      subject: data.subject,
      priority: data.priority || 'medium',
      support_type: data.supportType,
      attached_files_count: data.attachedFiles || 0,
      status: 'new',
      submitted_at: new Date().toISOString()
    }]);
}
```

### 2. Career Application Submission
```typescript
export async function submitCareerApplication(data: {
  position: string;
  name: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
  coverLetterFileUrl?: string;
  portfolio?: string;
  experience?: string;
}) {
  const { error } = await supabase
    .from('career_applications')
    .insert([{
      position: data.position,
      applicant_name: data.name,
      email: data.email,
      phone: data.phone,
      resume_url: data.resume,
      cover_letter: data.coverLetter,
      cover_letter_file_url: data.coverLetterFileUrl,
      portfolio_url: data.portfolio,
      experience: data.experience,
      status: 'new',
      applied_at: new Date().toISOString()
    }]);
}
```

### 3. Adding New API Endpoints

To add a new form submission function:

1. **Create the function in `api.ts`:**
```typescript
export async function submitNewFormType(data: YourDataType) {
  try {
    const { error } = await supabase
      .from('your_table_name')
      .insert([{
        // Map your form data to database columns
        field1: data.field1,
        field2: data.field2,
        submitted_at: new Date().toISOString()
      }]);

    if (error) throw new Error(error.message);
    return { success: true, message: 'Form submitted successfully' };
  } catch (error) {
    throw error;
  }
}
```

2. **Import and use in your form component:**
```typescript
import { submitNewFormType } from '../utils/api';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await submitNewFormType(formData);
    toast.success('Form submitted successfully!');
  } catch (error) {
    toast.error('Failed to submit form');
  } finally {
    setIsSubmitting(false);
  }
};
```

## Database Schema

### Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT NOT NULL,
  subject VARCHAR(255),
  priority VARCHAR(10) DEFAULT 'medium',
  support_type VARCHAR(100),
  attached_files_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'new',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Career Applications Table
```sql
CREATE TABLE career_applications (
  id SERIAL PRIMARY KEY,
  position VARCHAR(255) NOT NULL,
  applicant_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  resume_url TEXT,
  cover_letter TEXT,
  cover_letter_file_url TEXT,
  portfolio_url TEXT,
  experience TEXT,
  status VARCHAR(20) DEFAULT 'new',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**To add new tables:** Use Supabase dashboard or SQL editor to create new tables with appropriate columns.

## Adding New Form Types

### 1. Create New Form Page
**File:** `src/pages/ContactNewTypePage.tsx`

```tsx
import { ContactForms } from '../components/ContactForms';

interface ContactNewTypePageProps {
  navigate: (path: string) => void;
  currentPath: string;
}

export function ContactNewTypePage({ navigate }: ContactNewTypePageProps) {
  const handleBack = () => {
    navigate('/');
  };

  return <ContactForms formType="new-type" onBack={handleBack} />;
}
```

### 2. Update Form Types
**File:** `src/components/ContactForms.tsx`

```typescript
// Update the FormType union
type FormType = 'sales' | 'support' | 'volunteer' | 'event-host' | 'investor' | 'new-type';

// Add form configuration
const getFormConfig = (formType: FormType) => {
  switch (formType) {
    case 'new-type':
      return {
        title: 'New Form Type',
        description: 'Submit your new type inquiry',
        submitText: 'Submit Inquiry'
      };
    // ... other cases
  }
};
```

### 3. Add Route
**File:** `src/router.tsx`

```typescript
// Add new route
case '/contact-us/new-type':
  return <ContactNewTypePage navigate={navigate} currentPath={currentPath} />;
```

### 4. Update API Function
**File:** `src/utils/api.ts`

```typescript
// Update submitContactForm to handle new type
export async function submitContactForm(data: {
  type: 'sales' | 'support' | 'volunteer' | 'event-host' | 'investor' | 'new-type';
  // ... rest of the data
}) {
  // Handle the new form type in the submission logic
}
```

## UI Components Reference

### 1. Input Components

#### Text Input
```tsx
<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  required
/>
```

#### Email Input
```tsx
<Input
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

#### Phone Input
```tsx
<Input
  type="tel"
  placeholder="+63 9XX XXX XXXX"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
```

#### Textarea
```tsx
<Textarea
  placeholder="Enter your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={4}
  required
/>
```

### 2. Selection Components

#### Select Dropdown
```tsx
<Select value={selectedValue} onValueChange={setSelectedValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Radio Group
```tsx
<RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

### 3. Form Layout

#### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="grid gap-2">
    <Label htmlFor="firstName">First Name</Label>
    <Input id="firstName" />
  </div>
  <div className="grid gap-2">
    <Label htmlFor="lastName">Last Name</Label>
    <Input id="lastName" />
  </div>
</div>
```

#### Form Actions
```tsx
<div className="flex gap-4">
  <Button type="button" variant="outline" onClick={onBack}>
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back
  </Button>
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
        Submitting...
      </>
    ) : (
      <>
        <Send className="w-4 h-4 mr-2" />
        Submit Form
      </>
    )}
  </Button>
</div>
```

## Form States & Notifications

### 1. Loading States
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

// In submit handler
setIsSubmitting(true);
try {
  await submitForm();
} finally {
  setIsSubmitting(false);
}
```

### 2. Success/Error Notifications
```typescript
import { toast } from "sonner";

// Success notification
toast.success('Form submitted successfully!', {
  description: 'We will get back to you within 24 hours.',
  icon: <CheckCircle className="w-4 h-4" />,
});

// Error notification
toast.error('Failed to submit form', {
  description: 'Please try again or contact us directly.',
  icon: <AlertCircle className="w-4 h-4" />,
});
```

### 3. Form Reset
```typescript
const resetForm = () => {
  setFormData({
    firstName: '',
    lastName: '',
    email: '',
    // ... reset all fields
  });
  setAttachedFiles([]);
  setIsSubmitted(false);
};
```

## Testing Forms

### 1. Local Development Testing
```bash
# Start development server
npm run dev

# Test form at:
http://localhost:5000/contact-us/sales
```

### 2. Form Validation Testing
- Test required field validation
- Test email format validation
- Test file upload limits
- Test form submission with network errors

### 3. Database Integration Testing
- Verify form data appears in Supabase tables
- Test file uploads to Supabase storage
- Check error handling for database connection issues

## Common Customizations

### 1. Changing Form Styling
**File:** `src/components/ui/input.tsx`, `src/components/ui/button.tsx`, etc.

The UI components use Tailwind CSS classes and can be customized by modifying the component files.

### 2. Adding Form Analytics
```typescript
// Add tracking to form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submit', {
      event_category: 'Contact',
      event_label: formType,
    });
  }
  
  // Continue with form submission...
};
```

### 3. Custom Email Notifications
Add email notification logic to the API functions in `api.ts` using Supabase Edge Functions or third-party email services.

### 4. Form Data Export
Create admin functions to export form submissions:

```typescript
export async function exportFormSubmissions(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .gte('submitted_at', startDate)
    .lte('submitted_at', endDate);
    
  return data;
}
```

## Troubleshooting

### Common Issues

1. **Form not submitting**
   - Check network connectivity
   - Verify Supabase configuration
   - Check browser console for JavaScript errors

2. **File uploads failing**
   - Verify file size limits
   - Check Supabase storage bucket permissions
   - Ensure file types are allowed

3. **Validation not working**
   - Check HTML5 validation attributes
   - Verify React Hook Form setup
   - Test required field handling

4. **Database errors**
   - Check Supabase table schema matches data structure
   - Verify API keys and permissions
   - Check database connection status

### Debug Commands
```bash
# Check form component
npm run dev
# Open browser console to see any JavaScript errors

# Test API connection
# Check Supabase dashboard for incoming data

# Verify file uploads
# Check Supabase Storage bucket for uploaded files
```