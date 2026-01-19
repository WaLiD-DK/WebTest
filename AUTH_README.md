# Authentication System Documentation

## Overview

This project uses **NextAuth.js v5** (next-auth@beta) for authentication with the following features:

- ✅ JWT-based session management
- ✅ Secure password hashing with bcryptjs
- ✅ Role-based access control (RBAC)
- ✅ Protected routes with middleware
- ✅ Form validation with Zod
- ✅ Password strength indicator
- ✅ Beautiful UI with Tailwind CSS

## Files Created

### Core Authentication Files

1. **`/lib/auth.ts`** - NextAuth configuration
   - JWT session strategy
   - Credentials provider with bcryptjs
   - User session with id, email, name, role
   - Callbacks for JWT and session
   - Helper functions for role-based access control

2. **`/app/api/auth/[...nextauth]/route.ts`** - NextAuth API route handler

3. **`/middleware.ts`** - Route protection middleware
   - Protects `/admin` routes (ADMIN, MANAGER roles only)
   - Protects `/account` routes (authenticated users)
   - Redirects unauthenticated users to login
   - Redirects authenticated users away from auth pages

### Validation

4. **`/lib/validations/auth.ts`** - Zod validation schemas
   - Login form validation
   - Register form validation with password rules
   - Password strength checker function

### API Routes

5. **`/app/api/auth/register/route.ts`** - User registration endpoint
   - Validates input data
   - Checks for duplicate emails
   - Hashes password with bcryptjs (12 rounds)
   - Creates user in database

### Pages

6. **`/app/(auth)/layout.tsx`** - Auth pages layout with centered design

7. **`/app/(auth)/login/page.tsx`** - Login page
   - Email and password fields
   - Remember me checkbox
   - Show/hide password toggle
   - Form validation with react-hook-form
   - Error handling with toast notifications
   - Link to register and forgot password

8. **`/app/(auth)/register/page.tsx`** - Register page
   - First name, last name, email, phone, password fields
   - Password confirmation
   - Real-time password strength indicator
   - Terms acceptance checkbox
   - Form validation
   - Link to login page

## Environment Variables

Add these to your `.env` file:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jewelry_store"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## User Roles

Defined in Prisma schema:

- **CUSTOMER** - Default role for new registrations
- **ADMIN** - Full administrative access
- **MANAGER** - Limited administrative access
- **SUPPORT** - Customer support access

## Usage Examples

### Protecting Server Components

```typescript
import { requireAuth, requireAdmin } from '@/lib/auth'

export default async function ProtectedPage() {
  const session = await requireAuth() // Requires any authenticated user
  // or
  const session = await requireAdmin() // Requires ADMIN or MANAGER role
  
  return <div>Welcome {session.user.name}</div>
}
```

### Protecting Client Components

```typescript
'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientProtectedPage() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') redirect('/login')
  
  return <div>Welcome {session?.user?.name}</div>
}
```

### Check User Role

```typescript
import { auth, isAdmin } from '@/lib/auth'

export default async function AdminButton() {
  const session = await auth()
  
  if (!isAdmin(session)) {
    return null
  }
  
  return <button>Admin Action</button>
}
```

### Sign Out

```typescript
'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </button>
  )
}
```

## Password Requirements

- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

## Security Features

1. **Password Hashing**: Uses bcryptjs with 12 salt rounds
2. **JWT Tokens**: Secure session management without database queries
3. **CSRF Protection**: Built into NextAuth.js
4. **HTTP-only Cookies**: Session tokens stored securely
5. **Role-Based Access**: Middleware prevents unauthorized access
6. **Input Validation**: All forms validated with Zod schemas

## Testing

1. **Create a test user**:
   ```bash
   # Use the register page at http://localhost:3000/register
   ```

2. **Login**:
   ```bash
   # Use the login page at http://localhost:3000/login
   ```

3. **Test protected routes**:
   - Try accessing `/account` without login (should redirect)
   - Try accessing `/admin` as a CUSTOMER (should be denied)

## Troubleshooting

### "Invalid email or password"
- Check that the user exists in database
- Verify password was hashed correctly during registration

### "Unauthorized" errors
- Ensure NEXTAUTH_SECRET is set in .env
- Check that middleware.ts is in the root directory
- Verify session is being created correctly

### TypeScript errors
- Make sure all types are properly extended in lib/auth.ts
- Check that @types/bcryptjs is installed

## Additional Features to Implement

- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication
- [ ] OAuth providers (Google, Facebook)
- [ ] Session management (view active sessions)
- [ ] Account lockout after failed attempts
- [ ] Password history (prevent reuse)
