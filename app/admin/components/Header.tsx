"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, SquareChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Controller } from "react-hook-form";

const Header = ({
  children,
  icon,
  method,
  method2,
  method3,
  control,
  description,
}: {
  children: React.ReactNode;
  icon?: boolean;
  method?: { name: string; route: string };
  method2?: {
    name: string;
    form: string;
    type: "submit" | "button" | "reset";
    isPending?: boolean;
    onClick?: React.MouseEventHandler;
  };
  method3?: {
    name: string;
    form?: string;
    type: "submit" | "button" | "reset";
    className?: string;
    icon?: React.ReactNode;
    onClick?: React.MouseEventHandler;
  }[];
  control?: never;
  description?: string;
}) => {
  const router = useRouter();

  return (
    <div className="px-4 py-4 items-center rounded-t-lg bg-secondary flex justify-between space-x-4">
      <div className="flex items-center">
        {icon && (
          <SquareChevronLeft
            className="cursor-pointer mr-2"
            onClick={() => router.back()}
            strokeWidth={0.5}
            stroke="#4C4DDC"
            size={30}
          />
        )}
        <div>
          <p className="text-l md:text-xl font-semibold">{children}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>

      <div className="flex space-x-3 ">
        {control && (
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-3">
                <Label>{field.value ? "Active" : "Inactive"}</Label>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        )}
        {method && (
          <Button asChild>
            <Link href={method?.route || "#"}>{method?.name}</Link>
          </Button>
        )}
        {method2 && (
          <Button
            form={method2.form}
            type={method2.type}
            onClick={method2.onClick}
            disabled={method2.isPending}
          >
            {method2.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {method2.name}
              </>
            ) : (
              method2.name
            )}
          </Button>
        )}
        {method3 && method3.map((btns, index) => (
          <Button
            key={index}
            type={btns.type}
            className={btns.className}
            onClick={btns.onClick}
          >
            {btns.icon}
            {btns.name}
          </Button>
        ))}

      </div>
    </div>
  );
};

export default Header;
