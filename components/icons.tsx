import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement>

export const SearchIcon = ({ className = 'w-5 h-5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" {...p}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 1.6C4.47 1.6 1.6 4.47 1.6 8C1.6 11.53 4.47 14.4 8 14.4C11.53 14.4 14.4 11.53 14.4 8C14.4 4.47 11.53 1.6 8 1.6ZM0.4 8C0.4 3.8 3.8 0.4 8 0.4C12.2 0.4 15.6 3.8 15.6 8C15.6 9.88 14.92 11.6 13.78 12.93L19.42 18.58C19.66 18.81 19.66 19.19 19.42 19.42C19.19 19.66 18.81 19.66 18.58 19.42L12.93 13.78C11.61 14.92 9.88 15.6 8 15.6C3.8 15.6 0.4 12.2 0.4 8Z"
            fill="currentColor"
        />
    </svg>
)

export const HeartIcon = ({ className = 'w-4 h-4', filled = false, ...p }: IconProps & { filled?: boolean }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" fill={filled ? 'currentColor' : 'none'} {...p}>
        <path
            d="M6.667 1.019C8.233-.387 10.653-.34 12.162 1.172c1.508 1.51 1.56 3.92.157 5.49l-5.652 5.661-5.652-5.66C-.389 5.09-.336 2.68 1.172 1.172 2.68-.338 5.097-.389 6.667 1.019ZM11.218 2.113c-1-1.002-2.613-1.042-3.66-.102l-.89.799-.89-.798c-1.05-.942-2.66-.9-3.664.102-.993.994-1.043 2.584-.128 3.635L6.667 10.436l4.68-4.687c.916-1.05.866-2.638-.129-3.636Z"
            fill="currentColor"
            stroke={filled ? 'none' : 'currentColor'}
            strokeWidth={filled ? 0 : 0.4}
        />
    </svg>
)

export const CartIcon = ({ className = 'w-[18px] h-5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 20" fill="none" {...p}>
        <rect x="1" y="6" width="16" height="13" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 8V5C13 2.79 11.21 1 9 1C6.79 1 5 2.79 5 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

export const UserIcon = ({ className = 'w-4 h-[19px]', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" fill="none" {...p}>
        <circle cx="8" cy="5" r="4" transform="rotate(180 8 5)" stroke="currentColor" strokeWidth="1.5" />
        <path
            d="M1 14.935c0-.86.541-1.628 1.351-1.917 3.653-1.305 7.645-1.305 11.298 0 .81.29 1.351 1.057 1.351 1.917v1.315c0 1.188-1.052 2.1-2.227 1.932l-.954-.136a24.55 24.55 0 0 0-6.638 0l-.954.136C2.052 18.35 1 17.438 1 16.25v-1.316Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
)

export const CloseIcon = ({ className = 'w-3.5 h-3.5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" {...p}>
        <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
)

export const PlusIcon = ({ className = 'w-3.5 h-3.5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" {...p}>
        <path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
    </svg>
)

export const StarIcon = ({ className = 'w-3.5 h-3', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12" fill="none" {...p}>
        <path
            d="M6.916 0l2.127 3.608 4.131.883-2.816 3.114.426 4.154-3.868-1.684-3.868 1.684.426-4.154L.628 4.49l4.131-.882L6.916 0z"
            fill="#F99E31"
        />
    </svg>
)

export const CaretIcon = ({ className = 'w-2.5 h-1.5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="none" {...p}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708Z"
            fill="currentColor"
        />
    </svg>
)

export const ArrowRightIcon = ({ className = 'ml-2 w-2.5 h-2', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 8" fill="none" {...p}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9 4.5H0v-1h9v1Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M9 4.5 6 1.5l.707-.708 3 3L9 4.5Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M9 3.5 6 6.5l.707.708 3-3L9 3.5Z" fill="currentColor" />
    </svg>
)

export const ChevronLeftIcon = ({ className = 'w-5 h-5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...p}>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const ChevronRightIcon = ({ className = 'w-5 h-5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...p}>
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const CompareIcon = ({ className = 'w-4 h-4', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" {...p}>
        <path
            d="M10.667 13.333a.667.667 0 0 1-.472-1.138l2.195-2.195H4a.667.667 0 0 1 0-1.333h10a.667.667 0 0 1 .472 1.138l-3.333 3.333a.664.664 0 0 1-.472.195Z"
            fill="currentColor"
        />
        <path
            d="M12 6.667H2a.667.667 0 0 1-.472-1.138l3.333-3.333a.667.667 0 1 1 .944.943L3.61 5.333H12a.667.667 0 0 1 0 1.334Z"
            fill="currentColor"
        />
    </svg>
)

export const SunIcon = ({ className = 'w-[18px] h-[18px]', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...p}>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        <path
            d="M12 2v2.2M12 19.8V22M4.9 4.9l1.55 1.55M17.55 17.55 19.1 19.1M2 12h2.2M19.8 12H22M4.9 19.1l1.55-1.55M17.55 6.45 19.1 4.9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
        />
    </svg>
)

export const MoonIcon = ({ className = 'w-[18px] h-[18px]', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...p}>
        <path
            d="M20.354 15.354A9 9 0 1 1 8.646 3.646a7 7 0 0 0 11.708 11.708Z"
            fill="currentColor"
        />
    </svg>
)

export const MinusIcon = ({ className = 'w-3 h-3', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" {...p}>
        <path d="M376 232H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h368c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
    </svg>
)

export const HamburgerIcon = ({ className = 'w-[18px] h-3.5', ...p }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" fill="none" {...p}>
        <path d="M0 1h18M0 13h18M0 7h18" stroke="currentColor" strokeWidth="2" />
    </svg>
)
