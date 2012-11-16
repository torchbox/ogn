require 'yui/compressor'
require 'uglifier'
require 'html_press'

module Jekyll
  module Compressor
    def output_file(dest, content)
      FileUtils.mkdir_p(File.dirname(dest))
      File.open(dest, 'w') do |f|
        f.write(content)
      end
    end

    def output_html(path, content)
      self.output_file(path, HtmlPress.press(content))
    end

    def output_js(path, content)
      self.output_file(path, Uglifier.new.compile(content))
    rescue Uglifier::Error => e
      warn "parse error occurred while processing: #{path}"
      warn "details: #{e.message.strip}"
      warn "copying initial file"
      self.output_file(path, content)
    end

    def output_css(path, content)
      compressor = YUI::CssCompressor.new
      self.output_file(path, compressor.compress(content))
    rescue Exception => e
      warn "parse error occurred while processing: #{path}"
      warn "details: #{e.message.strip}"
      warn "copying initial file"
      self.output_file(path, content)
    end
  end

  class StaticFile
    include Compressor
    
    def copy_file(path, dest_path)
      FileUtils.mkdir_p(File.dirname(dest_path))
      FileUtils.cp(path, dest_path)
    end

    def write(dest)
      dest_path = self.destination(dest)

      return false if File.exist?(dest_path) and !self.modified?
      @@mtimes[path] = mtime

      case File.extname(dest_path)
        when '.js'
          if !@site.config['compress']['js'] || dest_path =~ /.min.js$/
            copy_file(path, dest_path)
          else
            self.output_js(dest_path, File.read(path))
          end
        when '.css'
          if !@site.config['compress']['css'] || dest_path =~ /.min.css$/
            copy_file(path, dest_path)
          else
            self.output_css(dest_path, File.read(path))
          end
        else
          copy_file(path, dest_path)
      end

      true
    end
  end

  class Post
    include Compressor

    def write(dest)
      dest_path = self.destination(dest)
      if @site.config['compress']['html']
        self.output_html(dest_path, self.output)
      else
        self.output_file(dest_path, self.output)
      end
    end
  end

  class Page
    include Compressor

    def write(dest)
      dest_path = self.destination(dest)
      if @site.config['compress']['html']
        self.output_html(dest_path, self.output)
      else
        self.output_file(dest_path, self.output)
      end
    end
  end

end