const readline = require('readline');
const fs = require('fs');
const _ = require('lodash');
let lineArr = [];
let lastArrElement = 0;
let rl = null;
let tf = false;

fs.open('outfile.gcode','w', (err, fd) => 
{
    if (err) 
	{
		throw err;
    }
    else
    {
		rl = readline.createInterface({input: fs.createReadStream('laserify_test.gcode')});
		rl.on('line', (line) =>
		{
			lineArr = line.split(' ');
			lastArrElement = lineArr.length-1;
			//console.log(lineArr);
			for(let i = 0; i <= lastArrElement;i++)
			{
				switch(lineArr[i])
				{
				case 'Z0':
					//console.log(line);
					//console.log('M8');
					fs.write(fd,line + '\r\n');
					fs.write(fd,'M8' +'\r\n');
					tf = true;
					break;
				case 'Z5':
					//console.log('M9');
					//console.log(line);
					fs.write(fd,'M9' +'\r\n');
					fs.write(fd,line + '\r\n');
					tf = true;
					break;
				case 'Z15':
					//console.log('M9');
					//console.log(line);
					fs.write(fd,'M9' +'\r\n');
					fs.write(fd,line + '\r\n');
					tf = true;
					break;
//				default:
					//tf = false;
				}
			}
			//console.log(line);
			if(tf == false)
			{
				//console.log(line);
				fs.write(fd,line + '\r\n');
			}
			else{tf = false;}
			
			lastArrElement = 0;
		});
		//rl.on('end', hclose(fs,fd));
	} 
});

