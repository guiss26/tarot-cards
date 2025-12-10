import React, { useState } from 'react';
import { Box } from '@mui/material';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, ...rest } = props;

  const handleError = () => setDidError(true);

  if (didError) {
    return (
      <Box
        sx={{
          display: 'inline-block',
          backgroundColor: 'grey.100',
          textAlign: 'center',
          verticalAlign: 'middle',
          width: '100%',
          height: '100%',
          ...style,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={ERROR_IMG_SRC}
            alt="Error loading image"
            data-original-url={src}
            {...rest}
          />
        </Box>
      </Box>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}

export default ImageWithFallback