'use client'; // since this will have user interaction it will be a client component

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
    children: React.ReactNode; // this will be the child element in the wrapper comp
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

// mode = "redirect" means that by default the button will redirect
export const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {
    const router = useRouter();

    if (mode === "modal") {
        return (
            <span>
                {/* TODO: implement modal */}
            </span>
        )
    }

    const onClick = () => {
        router.push("/auth/login")
    }

    return (
        <span onClick={onClick}>
            {children}
        </span>
    )
}