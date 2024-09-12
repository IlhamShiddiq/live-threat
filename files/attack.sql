CREATE TABLE public.attacks (
    id serial4 NOT NULL,
    sourceCountry      varchar       NULL,
    destinationCountry varchar      NULL,
    millisecond        integer       NULL,
    type               varchar      NULL,
    weight             varchar      NULL,
    attackTime         timestamptz  NULL,

    CONSTRAINT attacks_pkey PRIMARY KEY (id)
);

