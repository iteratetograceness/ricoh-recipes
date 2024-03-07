import { Suspense } from "react";

export async function Stream({
    stream,
  }: {
    stream?: ReadableStream<any>;
  }) {
    if (!stream) return null;

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
  