# frozen_string_literal: true

# The coolest program
class CoolProgram
  attr_reader :coolness

  def initialize
    @coolness = 11
  end

  def print
    puts "Coolness: #{coolness}/10"
  end
end
