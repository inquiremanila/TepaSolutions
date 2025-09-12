# Form Debugging Guide - Tepa Solutions Project

## Overview
This guide explains all the renamed form-related files and their functionality to help you debug Supabase communication issues.

## Renamed Form Files

### 📋 FORM1: Contact Forms (form1-contact-forms.tsx)
**Original:** `src/components/ContactForms.tsx`
**New Location:** `src/components/form1-contact-forms.tsx`

**Purpose:** Main contact forms component that handles multiple form types
**Form Types Supported:**
- Sales inquiries
- Support tickets  
- Volunteer applications
- Event hosting requests
- Investor relations

**Key Features:**
- Form validation using React hooks
- File upload functionality (support tickets)
- Dynamic form fields based on form type
- Supabase integration for data submission
- Toast notifications for success/error feedback

**Supabase Tables Used:**
- `contact_submissions` - stores all contact form data
- `volunteer_applications` - stores volunteer applications

**Files that import this:**
- `src/pages/ContactSalesPage.tsx`
- `src/pages/ContactSupportPage.tsx` 
- `src/pages/ContactEventHostPage.tsx`
- `src/pages/ContactInvestorPage.tsx`
- `src/pages/ContactVolunteerPage.tsx`

---

### 💬 FORM2: Tepabot Support (form2-tepabot-support.tsx)
**Original:** `src/components/Tepabot.tsx`
**New Location:** `src/components/form2-tepabot-support.tsx`

**Purpose:** AI chatbot with live support request form
**Features:**
- Interactive chat interface
- Live support request submission
- File attachment capability
- Contact form integration

**Supabase Tables Used:**
- `contact_submissions` (type: 'support')

**Files that import this:**
- `src/components/form1-contact-forms.tsx`
- `src/components/pages/InvestorsPage.tsx`

---

### 💼 FORM3: Careers Page (form3-careers-page.tsx)
**Original:** `src/pages/CareersPage.tsx` 
**New Location:** `src/pages/form3-careers-page.tsx`

**Purpose:** Career application and job listings management
**Features:**
- Job position listings with detailed descriptions
- Application form with resume/portfolio submission
- Experience level and availability selection
- Location preferences

**Supabase Tables Used:**
- `career_applications` - stores job applications

**Important Exports:**
- `jobPositions` array - used by other components
- `CareersPage` component

**Files that import this:**
- `src/pages/ContactCareersPage.tsx`
- `src/pages/JobPage.tsx`
- `src/router.tsx`
- `src/utils/seo1-data-sources.ts`

---

### 🎫 FORM4: Event Registration (form4-event-registration.tsx)
**Original:** `src/pages/EventPage.tsx`
**New Location:** `src/pages/form4-event-registration.tsx`

**Purpose:** Event registration and notification requests
**Features:**
- Event details display
- Registration form with attendee information
- Notification request form for future events
- Event capacity and scheduling

**Supabase Tables Used:**
- `event_registrations` - stores event registrations and notification requests

**Files that import this:**
- `src/router.tsx`

---

### 🔌 FORM5: API Handlers (form5-api-handlers.ts)
**Original:** `src/utils/api.ts`
**New Location:** `src/utils/form5-api-handlers.ts`

**Purpose:** Core Supabase integration and form submission handlers
**Key Functions:**
- `submitContactForm()` - handles contact submissions
- `submitCareerApplication()` - handles job applications  
- `submitVolunteerApplication()` - handles volunteer applications
- `submitEventRegistration()` - handles event registrations

**Environment Variables Required:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Files that import this:**
- `src/components/form1-contact-forms.tsx`
- `src/pages/ContactCareersPage.tsx`
- `src/pages/VolunteerPage.tsx`
- Plus other form-related components

---

### 🎨 FORM6: UI Components (form6-ui-components.tsx)  
**Original:** `src/components/ui/form.tsx`
**New Location:** `src/components/ui/form6-ui-components.tsx`

**Purpose:** Reusable form UI components built on react-hook-form
**Components Provided:**
- `Form` - Form provider wrapper
- `FormField` - Controlled form field
- `FormItem` - Form field container
- `FormLabel` - Accessible form labels
- `FormControl` - Form input wrapper
- `FormDescription` - Help text component
- `FormMessage` - Error message display

## Common Supabase Issues to Check

### 1. Environment Variables
Ensure your `.env` file contains valid credentials:
```
VITE_SUPABASE_URL=https://ruhsxjeiegdeshcnbuxy.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

### 2. Database Tables
Verify these tables exist in Supabase:
- `contact_submissions`
- `career_applications` 
- `volunteer_applications`
- `event_registrations`

### 3. Table Permissions
Check RLS (Row Level Security) policies allow:
- INSERT permissions for anonymous users
- Proper column access rights

### 4. Network Issues
- Check browser console for CORS errors
- Verify API endpoint accessibility
- Test Supabase connection manually

## Debugging Steps

### Step 1: Check Environment
```bash
# Verify environment variables are loaded
env | grep VITE_SUPABASE
```

### Step 2: Test API Connection
Open browser console on any form page and run:
```javascript
// Check if Supabase client is initialized properly
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
```

### Step 3: Monitor Network Requests  
1. Open DevTools → Network tab
2. Submit a form
3. Look for failed requests to Supabase endpoints
4. Check response errors

### Step 4: Check Console Logs
Form submissions include detailed error logging:
- Success: "Form submitted successfully" 
- Error: Detailed error messages with stack traces

## Next Steps for Fixing Issues

1. **Verify Supabase Setup**: Ensure database tables match the schema expected by the API handlers
2. **Test API Keys**: Validate that your API keys have proper permissions
3. **Check CORS Settings**: Ensure Supabase allows requests from your domain
4. **Review Table Structure**: Make sure column names match the API handler expectations
5. **Test Individual Forms**: Test each form type separately to isolate issues

## Files Summary
- **FORM1**: Main contact forms (`form1-contact-forms.tsx`)
- **FORM2**: Chatbot support (`form2-tepabot-support.tsx`)  
- **FORM3**: Career applications (`form3-careers-page.tsx`)
- **FORM4**: Event registration (`form4-event-registration.tsx`)
- **FORM5**: API/Database handlers (`form5-api-handlers.ts`)
- **FORM6**: UI components (`form6-ui-components.tsx`)

This renaming makes it easy to identify and debug form-related issues systematically.