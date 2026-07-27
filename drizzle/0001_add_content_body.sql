ALTER TABLE content_items ADD COLUMN body TEXT NOT NULL DEFAULT '';
UPDATE content_items
SET body = 'Why choose one target game when the same playing surface can deliver two? Sunnyland’s two-in-one set combines floor curling and shuffleboard with scoring zones at both ends of a portable rink.

The format is simple to introduce, quick to reset and flexible enough for families, schools, clubs and activity spaces. Players can focus on curling-style placement in one round, then switch to the faster scoring rhythm of shuffleboard in the next.

For buyers, the combined format gives one retail box a broader play story and encourages repeat use across different age groups.'
WHERE type = 'news' AND slug = 'shuffleboard-curling' AND TRIM(body) = '';
UPDATE content_items
SET body = 'Floor curling keeps the strategy of the ice while removing the need for skates, cold conditions or a specialist rink. A smooth indoor floor is enough to begin.

Players take turns sending stones towards a target, balancing accuracy, weight and teamwork. Because the motion is controlled and the rules are easy to explain, the game works well across ages and ability levels.

Start with short rounds, clear scoring zones and teams of two to four. Once everyone understands the pace, introduce blocking shots and tactical placement.'
WHERE type = 'news' AND slug = 'floor-curling-guide' AND TRIM(body) = '';
UPDATE content_items
SET body = 'Every product begins with a play experience: what should people do, feel and want to repeat? From there, our Ningbo team turns the idea into materials, mechanisms, samples and packaging.

Approved designs move through production and quality checks before export preparation. Close access to Ningbo and Shanghai ports helps us coordinate programmes for retailers and importers around the world.

That combination of playful thinking and practical manufacturing is what carries an idea from the first sketch to game night.'
WHERE type = 'news' AND slug = 'made-in-ningbo' AND TRIM(body) = '';
