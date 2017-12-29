require 'csv'

class CsvData

  def initialize(dir, file)
    @data = CSV.read(Rails.root.join(dir, file), headers: true)
  end

  def days
    @data.each do |row|
      row['created_on'] = row['created_at'].split(' ').first
    end

    @days = @data.map { |row| Date.parse(row['created_on']) }.uniq.sort.map(&:to_s)
  end

  def times
    @times = @data.map { |row| row['created_at'] }.sort.map(&:to_s)
  end

  def passing
    passing = Hash.new(0)

    @data.each do |row|
      passing[row['created_on']] += 1 if row['summary_status'] == 'passed'
    end

    passing.values_at(*@days)
  end

  def failing
    failing = Hash.new(0)

    @data.each do |row|
      failing[row['created_on']] += 1 if row['summary_status'] != 'passed'
    end

    failing.values_at(*@days)
  end

  def duration
    duration = Hash.new(0)

    @data.each do |row|
      duration[row['created_at']] = row['duration'].to_f
    end

    duration.values_at(*@times)
  end
end
