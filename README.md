# Documentation site for Velociraptor

This is the documentation site for Velociraptor - digging deeper!

## Building this site

The site uses the static website generator [Hugo](https://gohugo.io).

To develop on the site:
1. clone this repository by running the following git clone command
   ```
   git clone --recurse-submodules https://github.com/Velocidex/velociraptor-docs.git
   ```
    **Note** normal cloning will not work. You must recurse the submodules or hugo will not understand shortcodes and you will see errors such as:
  `failed to extract shortcode: template for shortcode "children" not found`

2. Run Hugo:
   1. Run Hugo with a natively installed version
   ```
   hugo serve
   ```

   2. Alternativly you can run hugo in docker as such:
   ```
   docker run --rm -it -v $(pwd):/src -p 1313:1313 klakegg/hugo:alpine server
   ```

3. Open your browser to http://localhost:1313.

   This will bring up a local web server where you can see your changes.

In future sessions, you might need to run one or more of the Python scripts listed in the [Makefile](Makefile).  Rebuilding the
 reference indices with these scripts should clear `REF_NOT_FOUND` errors during Hugo server startup.  Scripts require `pyyaml`.

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
