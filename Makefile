SUBDIRS = $(shell find . * -type d | grep -v "\.")

clean:
	rm tags
	rm ./controllers/tags
