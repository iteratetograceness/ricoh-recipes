import { Suspense } from "react";

export async function Reader({
    reader,
  }: {
    reader?: ReadableStreamDefaultReader<any>;
  }) {
    if (!reader) return null;

    const { done, value } = await reader?.read();
   
    if (done) {
      return null;
    }
   
    const text = new TextDecoder().decode(value);
   
    return (
      <span>
        {text}
        <Suspense>
          <Reader reader={reader} />
        </Suspense>
      </span>
    );
  }
  
  