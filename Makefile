.PHONY: Makefile

all: docs/firmware/images/sequence.png docs/firmware/images/successful.svg docs/firmware/images/data-publication.svg

docs/firmware/images/%.png: docs/firmware/images/%.dot
	dot -Tpng -Gdpi=150 -Nfontname="Source Sans Pro" -Nfontsize=10 -Gfontname="Source Sans Pro" -Gfontsize=10 -Efontname="Source Sans Pro" -Efontsize=8 -o$@ $<

docs/firmware/images/%.svg: docs/firmware/images/%.sequence
	goseq -o $@ $<

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
html: Makefile
	sphinx-build -M html ./ build
	cp build/html/README.html build/html/index.html
	find docs -type f -name \*.json | xargs -I@ cp -v @ build/html/@
