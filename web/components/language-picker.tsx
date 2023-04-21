"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"

export type LangOption = {
  name: string
  status: "empty" | "loading" | "loaded"
  popular?: boolean
  used?: boolean
}

export function LanguagePicker({
  langs,
  selected,
  onSelected,
}: {
  langs: LangOption[]
  selected: LangOption
  onSelected: (lang: LangOption) => void
}) {
  const [open, setOpen] = React.useState(false)
  const used = langs.filter((item) => item.used)
  const popular = langs.filter((item) => !item.used && item.popular)
  const others = langs.filter((item) => !item.popular && !item.used)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between  w-64"
        >
          {selected.status === "loading" ? (
            <Spinner />
          ) : (
            <Check className={cn("mr-2 h-4 w-4")} />
          )}
          {selected.name}
          <span className="flex-1" />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <ScrollArea style={{ height: "50vh" }}>
            <CommandEmpty>No language found.</CommandEmpty>

            <Group
              heading="Recently used"
              options={used}
              selected={selected}
              onSelect={(currentValue) => {
                setOpen(false)
                onSelected(used.find((item) => item.name === currentValue)!)
              }}
            />
            <Group
              heading="Popular"
              options={popular}
              selected={selected}
              onSelect={(currentValue) => {
                setOpen(false)
                onSelected(popular.find((item) => item.name === currentValue)!)
              }}
            />
            <Group
              heading="Rest"
              options={others}
              selected={selected}
              onSelect={(currentValue) => {
                setOpen(false)
                onSelected(others.find((item) => item.name === currentValue)!)
              }}
            />
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function Group({ heading, options, selected, onSelect }) {
  if (options.length === 0) return null
  return (
    <CommandGroup heading={heading}>
      {options.map((item) => (
        <LangItem
          key={item.name}
          item={item}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </CommandGroup>
  )
}

function LangItem({
  item,
  onSelect,
  selected,
}: {
  item: LangOption
  onSelect: (value: string) => void
  selected: LangOption
}) {
  const isLoaded = item.status === "loaded"
  const isSelected = item.name === selected.name
  const icon =
    item.status === "loading" ? (
      <Spinner />
    ) : (
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
    )
  return (
    <CommandItem key={item.name} onSelect={onSelect}>
      {icon}
      <span className={isLoaded ? "text-white" : "text-gray-400"}>
        {item.name}
      </span>
    </CommandItem>
  )
}
