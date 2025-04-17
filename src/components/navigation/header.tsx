'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/navigation/navigation-menu';
import { Menu, MoveRight, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUserProfile } from '../../hooks/useUserProfile';

function Header1() {
  const [isOpen, setOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { user } = useAuthStore();
  const { username, loading } = useUserProfile();

  useEffect(() => {
    if (!isLandingPage) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsTransparent(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  const navigationItems = [
    {
      title: 'Home',
      href: '/',
      description: '',
    },
    {
      title: 'Product',
      description: 'Discover our comprehensive trading platform features.',
      items: [
        { title: 'Strategy', href: '/strategy' },
        { title: 'Markets', href: '/markets' },
        { title: 'Following', href: '/Following' },
        { title: 'Subscriptions', href: '/subscriptions' },
        { title: 'News', href: '/news' },
      ],
    },
    {
      title: 'Resources',
      description: 'Everything you need to succeed in trading.',
      items: [
        { title: 'Education', href: '/education' },
        { title: 'Community', href: '/community' },
        { title: 'Support', href: '/support' },
        { title: 'Documentation', href: '/docs' },
        { title: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Price',
      href: '/price',
      description: '',
    },
  ];

  const navClasses =
    isLandingPage && isTransparent
      ? 'w-full z-40 fixed top-0 left-0 transition-colors duration-300'
      : 'w-full z-40 fixed top-0 left-0 bg-gray-900 border-b border-gray-800 transition-colors duration-300';

  const buttonClasses =
    isLandingPage && isTransparent
      ? 'font-medium text-sm text-white/90 hover:text-white'
      : 'font-medium text-sm';

  const triggerClasses =
    isLandingPage && isTransparent
      ? 'text-white/90 hover:text-white hover:bg-transparent focus:bg-transparent'
      : '';

  return (
    <header className={navClasses}>
      <div className='container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-[1fr_auto_1fr] items-center'>
        <div className='justify-start items-center gap-4 lg:flex hidden flex-row lg:pr-[25%]'>
          <NavigationMenu className='flex justify-start items-start'>
            <NavigationMenuList className='flex justify-start gap-4 flex-row'>
              {navigationItems.map(item => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink asChild>
                      <Link to={item.href}>
                        <Button
                          variant={isLandingPage && isTransparent ? 'ghost-transparent' : 'ghost'}
                          className={buttonClasses}
                        >
                          {item.title}
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className={`font-medium text-sm ${triggerClasses}`}>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className='!w-[450px] p-4 bg-gray-900 border border-gray-800'>
                        <div className='flex flex-col lg:grid grid-cols-2 gap-4'>
                          <div className='flex flex-col h-full justify-between'>
                            <div className='flex flex-col'>
                              <p className='text-base'>{item.title}</p>
                              <p className='text-muted-foreground text-sm'>{item.description}</p>
                            </div>
                          </div>
                          <div className='flex flex-col text-sm h-full justify-end'>
                            {item.items?.map(subItem => (
                              <Link
                                to={subItem.href}
                                key={subItem.title}
                                className='flex flex-row justify-between items-center hover:bg-gray-800 py-2 px-4 rounded'
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className='w-4 h-4 text-muted-foreground' />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className='flex lg:justify-center'>
          <p className={`font-semibold ${isLandingPage && isTransparent ? 'text-white' : ''}`}>
            StratsPro
          </p>
        </div>
        <div className='flex justify-end w-full gap-4 lg:pl-[25%]'>
          {user ? (
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 text-gray-300'>
                <User className='w-4 h-4' />
                <span>{loading ? 'Loading...' : username}</span>
              </div>
              <Button variant='outline' onClick={() => useAuthStore.getState().signOut()}>
                Sign out
              </Button>
            </div>
          ) : (
            <>
              <Link to='/signin'>
                <Button variant='outline'>Sign in</Button>
              </Link>
              <Link to='/register'>
                <Button>Get started</Button>
              </Link>
            </>
          )}
        </div>
        <div className='flex w-12 shrink lg:hidden items-end justify-end'>
          <Button variant='ghost' onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </Button>
          {isOpen && (
            <div className='absolute top-20 border-t flex flex-col w-full right-0 bg-gray-900 shadow-lg py-4 container gap-8'>
              {navigationItems.map(item => (
                <div key={item.title}>
                  <div className='flex flex-col gap-2'>
                    {item.href ? (
                      <Link to={item.href} className='flex justify-between items-center'>
                        <span className='text-lg'>{item.title}</span>
                        <MoveRight className='w-4 h-4 stroke-1 text-muted-foreground' />
                      </Link>
                    ) : (
                      <p className='text-lg'>{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map(subItem => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className='flex justify-between items-center'
                        >
                          <span className='text-muted-foreground'>{subItem.title}</span>
                          <MoveRight className='w-4 h-4 stroke-1' />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
              {user ? (
                <div className='flex flex-col gap-4 pt-4 border-t border-gray-800'>
                  <div className='flex items-center gap-2 text-gray-300 px-4'>
                    <User className='w-4 h-4' />
                    <span>{loading ? 'Loading...' : username}</span>
                  </div>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => useAuthStore.getState().signOut()}
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col gap-4 pt-4 border-t border-gray-800'>
                  <Link to='/signin' className='w-full'>
                    <Button variant='outline' className='w-full'>
                      Sign in
                    </Button>
                  </Link>
                  <Link to='/register' className='w-full'>
                    <Button className='w-full'>Get started</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Header1 };
