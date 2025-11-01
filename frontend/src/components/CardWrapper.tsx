import { forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardWrapperProps = React.ComponentProps<typeof Card> & {
  title: string;
  children: React.ReactNode;
  nextButton?: React.ReactNode;
};

const CardWrapper = forwardRef<HTMLDivElement, CardWrapperProps>(
  ({ title, children, nextButton, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "mx-8 mb-8 flex scroll-mt-20 flex-col shadow-md",
          className,
        )}
        {...props}
      >
        <CardHeader>
          <CardTitle className="font-bold text-2xl tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div>{children}</div>
          {nextButton && (
            <div className="mt-6 flex justify-end">{nextButton}</div>
          )}
        </CardContent>
      </Card>
    );
  },
);

CardWrapper.displayName = "CardWrapper";

export default CardWrapper;
