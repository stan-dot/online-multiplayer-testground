import { useState } from 'react';
import { EchoBot } from './bots/echo-bot/EchoBot';
import { BotsList } from './BotsList';
import TerminalHandler from './TerminalHandler';
import { Bot } from './types/Bot';

export default function Eliza() {
  const defaultBot: Bot = new EchoBot('EchoBot1', 'some description');
  const [currentBot, setCurrentBot] = useState(defaultBot)
  return <>
    <div>
      current bot:{currentBot.name}
    </div>
    <BotsList callback={setCurrentBot} startingBot={currentBot} />
    <TerminalHandler bot={currentBot} />
    <Footer currentBot={currentBot} />
  </>
}

function Footer(props: { currentBot: Bot }) {
  const additionalText: string = '';
  // const additionalText: string = props.currentBot.getDescription() ?? '';
  return <>
    <p>
      {additionalText}
    </p>
    <p>
      made in 2022 by <a href='https://github.com/stan-dot'>stan-dot</a>
    </p>
    <p id="eliza-license">

      The MIT License (MIT)

      Copyright (c) 2017 Nate Lewis

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the &quot;Software&quot;), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
    </p>
  </>
}
