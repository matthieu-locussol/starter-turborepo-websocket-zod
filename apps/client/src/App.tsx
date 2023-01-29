import React, { useMemo } from 'react';

export const App = () => {
   const socket = useMemo(() => new WebSocket('ws://localhost:3000'), []);

   socket.onopen = () => {
      console.log('Connected!');
   };

   const onClick = () => {
      socket.send(
         JSON.stringify({
            type: 'testo',
            message: 'chesto',
         }),
      );
   };

   return (
      <div>
         <h1>Hello World!</h1>
         <p>Blablabla...</p>
         <button onClick={() => onClick()}>Send msg</button>
         <button onClick={() => socket.close()}>Disconnect</button>
      </div>
   );
};
