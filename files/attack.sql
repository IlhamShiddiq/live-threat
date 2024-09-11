CREATE TABLE public.attacks (
    id serial4 NOT NULL,
    sourceCountry      varchar   NOT NULL,
    destinationCountry varchar,
    millisecond        integer   NOT NULL,
    type               varchar,
    weight             varchar   NOT NULL,
    attackTime         timestamptz NOT NULL,
    CONSTRAINT attacks_pkey PRIMARY KEY (id)
);

