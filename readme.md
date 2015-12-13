# size-table

Automagically display the size of your module at various levels of compression in your README. This is probably the most opinionated module/tool I will ever write.

## Install

```sh
$ npm install -g size-table
```

## Usage

### Basic

From the root of your project directory (ideally in an npm script) :

```sh
$ cat bundle.js | size-table
```

The first time this command is run, a size table will be inserted before the first subheading. If no subheadings exist, it will be appended to the end of the README.

It looks like this:

| compression          |  size |
| :------------------- | ----: |
| size-table.js        | 771 B |
| size-table.min.js    | 631 B |
| size-table.min.js.gz | 348 B |


Note that by default, the filename will be `package.name` as found in your package.json, falling back to “bundle” if a package.json cannot be found. You can override this behaviour by providing your desired name as the first argument:

```sh
$ cat bundle.js | size-table my-module
```

| compression         |  size |
| :------------------ | ----: |
| my-module.js        | 746 B |
| my-module.min.js    | 606 B |
| my-module.min.js.gz | 328 B |

Note that all subsequent invocations of the command will update the existing table. Additionally, once created, you are free to move the table to any location in your README.

### Advanced (sort of, but not really)

size-table should be able to find your README and packge.json files if they exists in the working directory. If it can’t, you can specify correct directory to search like so:

```sh
$ cat bundle.js | size-table --cwd=../elsewhere
```

Finally, if you don’t want size-table to overwrite your README file, you can have the mutated document sent directly to stdout by using the following flag:

```sh
$ cat bundle.js | size-table --stdout
```

## Licence

[MIT](http://opensource.org/licenses/MIT)
