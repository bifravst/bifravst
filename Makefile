all: docs/firmware/images/sequence.png docs/firmware/images/successful.svg docs/firmware/images/data-publication.svg

docs/firmware/images/%.png: docs/firmware/images/%.dot
	dot -Tpng -Gdpi=150 -Nfontname="Source Sans Pro" -Nfontsize=10 -Gfontname="Source Sans Pro" -Gfontsize=10 -Efontname="Source Sans Pro" -Efontsize=8 -o$@ $<

docs/firmware/images/%.svg: docs/firmware/images/%.sequence
	goseq -o $@ $<