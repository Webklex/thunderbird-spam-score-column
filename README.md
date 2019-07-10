Spam Score Column Thunderbird Add-On
------------------------------------
This is a simple [Mozilla Thunderbird](http://mozilla.com/thunderbird)
add-on that adds a sortable column to display the contents of
[SpamAssassin's](http://spamassassin.apache.org) `X-Spam-Score` header.

Installation
------------

You can run `make` to build an `*.xpi` file which you can install from within
Thunderbird's add-ons interface, or you can also manually zip all the files up
yourself, or you might also be able to directly clone this repository into the
`extensions` directory in your Thunderbird profile.

Limitations
-----------

Adding a new header to the columns list requires that the new header data be
added to the header database. Unfortunately, this will only take effect for
new messages. You can force a rescan of old messages by right-clicking on each
and every mail folder, selecting "Properties" and clicking the "Repair Folder"
button on the "General Information" tab. You can also go through your
Thunderbird profile folder, deleting all the `*.msf` files, and refreshing
your Thunderbird accounts.

Of course, some mail servers may not include the `X-Spam-Score` header unless
it's value is over a certain threshold, or may not include it at all.
