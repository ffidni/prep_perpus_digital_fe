import React from 'react';

export function GoogleField({
  placeholder,
  type,
  name,
  width,
  onChanged,
  value,
  className,
  bg,
  isTextArea,
}) {
  const classString = `peer ${isTextArea ? 'h-20' : 'h-10'} ${
    width ?? 'w-full'
  } rounded-md text-black placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-sky-600 focus:outline-none focus:border-rose-600 ${
    bg ?? 'bg-transparent'
  } ${className} `;

  return (
    <div class="bg-white rounded-sm">
      <div class="relative bg-inherit">
        {isTextArea ? (
          <textarea
            type={type ?? 'text'}
            name={name}
            onChange={onChanged}
            value={value}
            class={classString}
            placeholder={placeholder}
          ></textarea>
        ) : (
          <input
            type={type ?? 'text'}
            name={name}
            onChange={onChanged}
            value={value}
            class={classString}
            placeholder={placeholder}
          />
        )}

        <label
          class={`absolute cursor-text left-0 -top-3 text-sm text-gray-500 ${
            bg ?? 'bg-inherit'
          } mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all`}
        >
          {placeholder}
        </label>
      </div>
    </div>
  );
}
