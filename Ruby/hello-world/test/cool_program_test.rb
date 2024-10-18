# frozen_string_literal: true

require 'minitest/autorun'
require 'minitest/reporters'
require_relative '../lib/cool_program'

class CoolProgramTest < Minitest::Test
  def test_coolness_off_the_charts
    assert_equal 11, CoolProgram.new.coolness
  end
end

Minitest::Reporters.use! Minitest::Reporters::DefaultReporter.new
