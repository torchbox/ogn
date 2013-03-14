# Software requirements

* Ruby
* Ruby Gems

And the following gems installed ("sudo gem install xxxx"):

* jekyll

(The following don't work on github pages but should be installed if hosting elsewhere)
* yui-compressor - sudo gem install yui-compressor
* uglifier
* html_press

# Other notes

* All previous talk slides/media should be uploaded to the s3 bucket at http://media.ogn.s3.amazonaws.com/ and links prefixed with that URL.
* The _posts folder contains an "example" post, to be used as a guide.
* The site has launched with links to talks from the last 2 years. Others exist (unlinked and not prepared for the new style) in the posts_archive folder.
* If supported (Github Pages doesn't) the CSS/JS/HTML compression can be toggled with the "compress" configuration variables in _config.yml. 
* CNAME file in root is used by github to serve pages from the domain specified.
* All previous OGNs have an explicit permalink in the format "[year]/[mmm]-[dd][ordinal]". This is purely to keep google juice. All future OGNs should have a permalink of "ogn[number]", thus dropping the non-memorable date.