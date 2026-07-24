import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { fetchMe, removeUserToken, type Delegate } from '../lib/user-auth';
import { User, LogOut, LayoutDashboard, Calendar } from 'lucide-react';

export function UserNav() {
  const [user, setUser] = useState<Delegate | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
      const data = await fetchMe();
      setUser(data);
      setLoading(false);
    }
    loadUser();
  }, [location.pathname]);

  const handleSignOut = () => {
    removeUserToken();
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="h-9 w-20 animate-pulse bg-muted rounded-md" />
    );
  }

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            Register
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-background border-border text-foreground" align="end" forceMount>
          <DropdownMenuLabel className="font-normal text-muted-foreground">
            Welcome to DeliverIQ
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted" />
          <DropdownMenuItem asChild className="focus:bg-muted focus:text-primary cursor-pointer">
            <Link to="/login" className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="focus:bg-muted focus:text-primary cursor-pointer">
            <Link to="/signup" className="flex w-full items-center">
              <span>Create Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-muted" />
          <DropdownMenuItem asChild className="focus:bg-muted focus:text-primary cursor-pointer">
            <Link to="/sessions" className="flex w-full items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Register for Events</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-muted hover:text-primary">
          <User className="mr-2 h-4 w-4" />
          {user.name.split(' ')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border-border text-foreground" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-muted" />
        <DropdownMenuItem asChild className="focus:bg-muted focus:text-primary cursor-pointer">
          <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex w-full items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>{user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-muted" />
        <DropdownMenuItem onClick={handleSignOut} className="focus:bg-red-900/50 focus:text-red-200 cursor-pointer text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
