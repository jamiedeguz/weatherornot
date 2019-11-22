Drop table census_temp;

CREATE TABLE avg_temp (
    state VARCHAR,
    avg_F float,
    avg_c float,
	rank float
);

CREATE TABLE census (
	position float,
	median_age float,
    population float,
    poverty_count float,
	household_income float,
	per_capita_income float,
	name VARCHAR,
	state VARCHAR
);

Select * from avg_temp;

ALTER TABLE census 
DROP COLUMN position,
DROP COLUMN state;


ALTER TABLE census 
RENAME COLUMN name TO state;

CREATE TABLE census_temp as
	SELECT census.state, census.population, census.household_income, census.per_capita_income, avg_temp.avg_f, avg_temp.avg_c  
	FROM census  
	FULL OUTER JOIN avg_temp  
	ON census.state = avg_temp.state;  
	
Select * from census_temp;

DELETE FROM census_temp WHERE (state = 'Puerto Rico');
DELETE FROM census_temp WHERE (state = 'District of Columbia');