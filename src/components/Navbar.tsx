import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react/icons';
/* import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'; */
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"


const Navbar = async () => {
/*     const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isAdmin = user?.email === process.env.ADMIN_EMAIL; */

    const user = null
    const isAdmin = null
  
    return (
      <div className='sticky top-0 z-[20] w-full border-b bg-white/75 backdrop-blur-lg'>
        <MaxWidthWrapper>
          <div className='flex h-14 items-center justify-between border-b'>
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
            <a href="/" className='font-semibold'>
              "Saas"/<span className='text-green-600'>Inventory</span><span className='text-green-600'>Management</span>
            </a>
            <div className='flex items-center space-x-4'>
              {user ? (
                <>
                  <Link href='/api/auth/logout' className={buttonVariants({ size: "sm", variant: "ghost" })}>
                    Sign out
                  </Link>
                  {isAdmin && (
                    <Link href='/' className={buttonVariants({ size: "sm", variant: "ghost" })}>
                      Dashboard ✨
                    </Link>
                  )}
                  <Link href='/' className={buttonVariants({ size: "sm", variant: "ghost" })}>
                    Data library
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </>
              ) : (
                <>
                  <Link href='/' className={buttonVariants({ size: "sm", variant: "ghost" })}> {/* '/api/auth/register' */}
                    Sign up
                  </Link>
                  <Link href='/' className={buttonVariants({ size: "sm", variant: "ghost" })}>   {/* '/api/auth/login/' */}
                    Login
                  </Link>
                  <div className='hidden h-8 w-px bg-zinc-200 sm:block' />
                  <Link href='/configure/upload/' className={buttonVariants({ size: "sm", className: "hidden sm:flex items-center gap-1" })}>
                    Metrics
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    );
  };
  
  export default Navbar