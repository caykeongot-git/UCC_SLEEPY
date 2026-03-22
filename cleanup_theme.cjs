const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/admin/fandb/create.jsx',
  'src/pages/admin/fandb/edit.jsx',
  'src/pages/admin/fandb/index.jsx',
  'src/pages/admin/movies/cinemas/create.jsx',
  'src/pages/admin/movies/cinemas/edit.jsx',
  'src/pages/admin/movies/cinemas/index.jsx',
  'src/pages/admin/movies/create.jsx',
  'src/pages/admin/movies/edit.jsx',
  'src/pages/admin/movies/index.jsx',
  'src/pages/admin/movies/rooms/create.jsx',
  'src/pages/admin/movies/rooms/edit.jsx',
  'src/pages/admin/movies/rooms/index.jsx',
  'src/pages/BookingPage.jsx',
  'src/pages/FoodAndBeverage.jsx',
  'src/pages/SeatMatrix.jsx',
  'src/pages/ShowtimeSelector.jsx'
];

files.forEach(file => {
  const fullPath = path.resolve(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 1. Remove redundant "dark:dark:" or double dark tags
    content = content.replace(/dark:dark:/g, 'dark:');
    
    // 2. Fix the specific overlapping replacements from the previous script
    // Redundant text-slate replacements
    content = content.replace(/text-slate-400 dark:text-slate-500 dark:text-slate-400/g, 'text-slate-500 dark:text-slate-400');
    content = content.replace(/text-slate-500 dark:text-slate-400 dark:text-slate-500/g, 'text-slate-500 dark:text-slate-400');
    content = content.replace(/text-slate-400 dark:text-slate-500/g, 'text-slate-500 dark:text-slate-400');
    
    // Redundant border replacements
    content = content.replace(/border-white\/5 dark:border-white\/10 dark:border-white\/5/g, 'border-slate-200 dark:border-white/5');
    
    // 3. De-duplicate any whitespace-separated classes in any className="..." or class="..."
    content = content.replace(/(?:\bclass(?:Name)?\s*=\s*(?:["']|{[`'"]))(.*?)(?:["']|[`'"]})/g, (match, classString) => {
        const classes = classString.split(/\s+/);
        const uniqueClasses = [...new Set(classes)];
        return match.replace(classString, uniqueClasses.join(' '));
    });

    fs.writeFileSync(fullPath, content);
    console.log(`Cleaned up ${file}`);
  }
});
