/*
 * 02_add_professor_field.sql
 * Copyright (C) 2021 romgrk <romgrk@arch>
 *
 * Distributed under terms of the MIT license.
 */

ALTER TABLE professor
    ADD COLUMN mrmn BOOLEAN DEFAULT FALSE NOT NULL;

-- vim:et
