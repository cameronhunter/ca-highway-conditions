File "File"
  = _ parts:(HTML / Notice / BlankLine)+ _
    { return parts.filter(Boolean).reduce((state, notice) => Object.assign({}, state, notice.highway && { [notice.highway]: notice }), {}) }

Notice "Notice"
  = highway:Highway notices:(title:Title messages:Message+ { return { title, messages } })+
    { return Object.assign({}, highway, { notices }); }

Highway "Highway"
  = type:$([A-Z]+) Space+ highway:$([0-9]+) EOL
    { return { type, highway }; }

Title "Title"
  = Space+ "[" title:$(Text+) "]" EOL
    { return title; }

Message "Message"
  = start:MessageStart rest:(lines:MessageLine* blankline:BlankLine { return lines.join('').trim() + '\n\n'; })*
    { return [start, ...rest].join(' ').trim(); }

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
  = "<" [a-z]+ ">" _ { return null; }
  / "<" "/" [a-z]+ ">" _ { return null; }

Space "Space"
  = [ ]

_ "Whitespace"
  = [ \t\n\r]*
