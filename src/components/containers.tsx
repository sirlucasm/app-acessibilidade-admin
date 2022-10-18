import { PropsWithChildren } from "react";
import { clsx } from 'clsx';

type ContainerProps = PropsWithChildren & {
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

export const Container = ({ children, justifyContent='start', alignItems='start' }: ContainerProps) => {
  return (
    <div className={clsx('flex flex-col h-[100vh] w-[100%]', {
      [`justify-${justifyContent}`]: justifyContent,
      [`items-${alignItems}`]: alignItems,
    })}>
      {children}
    </div>
  )
}