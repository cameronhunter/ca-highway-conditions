File "File"
  = _ parts:(HTML / Notice / BlankLine)+ _
    { return parts.filter(Boolean); }

Notice "Notice"
  = highway:Highway notices:(title:Title messages:Message+ { return { title, messages: messages.reduce((state, message) => state.concat(message), []) } })+
    { return Object.assign({}, highway, { notices }); }

Highway "Highway"
  = type:$([A-Z]+) Space+ highway:$([0-9]+) EOL
    { return { type, highway }; }

Title "Title"
  = Space+ "[" title:$(Text+) "]" EOL
    { return title; }

Message "Message"
  = start:MessageStart rest:(lines:MessageLine* BlankLine { return lines.concat('\n\n').join(' ') })*
    { return [start, ...rest].join(' ').split('\n\n').map(s => s.trim()).filter(Boolean); }

MessageStart "MessageStart"
  = Space+ message:$(MessageLine)
    { return message.trim(); }

MessageLine "MessageLine"
  = message:$(Text+) EOL
    { return message.trim(); }

BlankLine "BlankLine"
  = EOL
    { return '\n'; }

EOL "EOL"
  = Space* [\r]? [\n]

Text "Text"
  = $(Character Space*)

Character "Character"
  = [A-Z0-9]
  / [./\\\-?(),&'";{}@#!$%^*=+:|><~`]

HTML
  = "<" [a-z]+ (Space+ Attribute)* ">" _ { return null; }
  / "<" "/" [a-z]+ ">" _ { return null; }

Attribute
  = [a-z]+ Space? "=" Space? "\"" [a-z]+ "\""

Space "Space"
  = [ ]

_ "Whitespace"
  = [ \t\n\r]*
