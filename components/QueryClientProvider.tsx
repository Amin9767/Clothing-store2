"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

interface IQueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const QueryClientProviderComponent = ({
  children,
}: IQueryClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
