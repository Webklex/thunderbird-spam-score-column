UUID=thunderbird-spam-score-column@webklex.com
SOURCES=chrome/ chrome.manifest install.rdf README.md LICENSE
ARCHIVE=${UUID}.xpi

all: ${ARCHIVE}

${ARCHIVE}:
	zip -r ${ARCHIVE} ${SOURCES}

clean:
	-rm -f ${ARCHIVE}

whoopee:
	@echo "Wheee!"
