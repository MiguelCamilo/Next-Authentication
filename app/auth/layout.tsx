const AuthLayout = ({ children } : { children: React.ReactNode }) => {
    return ( 
        <div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-200 to-stone-700'>
            {children}
        </div>
     );
}
 
export default AuthLayout;