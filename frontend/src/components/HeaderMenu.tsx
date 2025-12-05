"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function HeaderMenu() {
  const navigate = useNavigate();
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  const handleCreateEvent = async () => {
    const res = await fetch(`${apiEndpoint}/api/v1/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    const code = data.url_end_code;

    navigate(`/${code}/members`);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label="Open menu"
          size="icon-sm"
          className="cursor-pointer"
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/top")}>
            topページへ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateEvent}>
            はじめから
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
