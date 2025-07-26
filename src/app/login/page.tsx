'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle authentication here.
    // For this demo, we'll just redirect to the dashboard.
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-headline">Drishti Command Center</CardTitle>
          <CardDescription>Commander Access Portal</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="commander@drishti.gov" required defaultValue="commander@drishti.gov" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="Kanchi@0003" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Authenticate & Enter
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
