================================================================================
Versioning
================================================================================

We use
`semantic-release <https://github.com/semantic-release/semantic-release>`_
to automatically determine the next version of a project **and** publish
a release in the GitHub project as well as release it to our `npm
organization <https://www.npmjs.com/settings/bifravst/packages>`_.

The next version is determined by scanning the commit messages. They
must follow `the Angular commit message
rules <https://github.com/semantic-release/semantic-release#commit-message-format>`_,
and in every library `a
hook <https://github.com/marionebl/commitlint>`_ will check commit
messages against these rules.

.. note::

    The ``package.json`` of a project should only contain
    ``0.0.0-development`` as  the ``version``
    property, semantic-release will ignore the value.
    
.. warning::

    Only the published package on npm will contain the correct version number.

How to release a new version of a package
================================================================================

Let's assume we have a library, which has the npm version
``2.3.4``.

A new version will be publish by the respective project's CI run. All
you have to do, is use commit messages that follow the `schema describe
here <https://github.com/semantic-release/semantic-release#commit-message-format>`_.

There are three commit messages that will trigger a release:

Patch release:

.. code-block::

    fix: <commit message>

Feature release:

.. code-block::

    feat: <commit message>

Breaking Release:

.. code-block::

    <scope>: <commit message>
    
    BREAKING CHANGE:
    
    <description of breaking change>

.. warning::

    Note that **any other** commit message format **will not trigger** a
    release.

Patch release (``fix``) ``2.3.4 -> 2.3.5`` 🐞
--------------------------------------------------------------------------------

.. note::

    A fix is a change to the implementation which removes a bug **without
    changing the public API** (method names and signatures, exports) of the
    library. The consumer of the library must not need to change their
    implementation when installing the fixed version.

To release a fix (which will update the version from ``2.3.4``
to ``2.3.5``, use the type ``fix`` in the commit
message:

.. code-block::

    fix: <commit message>

You can optionally add a scope, which is a lowercase string used to
identify the affected *component*.

.. code-block::

    fix(<scope>): <commit message>

Scopes are useful when the project is rather big.

Feature release (``feat``) ``2.3.4 -> 2.4.0`` 🚀
--------------------------------------------------------------------------------

.. note::

    A feature is a change to the implementation of a library which adds
    additional functionality **without changing the public API** of the
    library. You may add new exports, methods and even extra, optional
    method arguments, but the consumer of the library must not need to
    change their implementation when installing the library with the new
    feature.

To release a feature (which will update the version from
``2.3.4`` to ``2.4.0``, use the type
``feat`` in the commit message:

.. code-block::

    feat: <commit message>

You can optionally add a scope as well.

Breaking Release (``BREAKING CHANGE:``) ``2.3.4 -> 3.0.0`` 🚨
--------------------------------------------------------------------------------

.. note::

    Every time the public API of the library changes in a way that
    requires the consumer to update their implementation **you must mark the
    change as breaking**. This can happen if method names and arguments are
    renamed, previously optional arguments become required, arguments get
    removed, classes get renamed. Even if the change is very small, as soon
    as you are breaking the library's *contract* (its public API) it is
    considered a breaking change, `according to
    semver <https://semver.org/#spec-item-8>`_.

To release a breaking release (which will update the version from
``2.3.4`` to ``3.0.0``, use the text :code:`BREAKING
CHANGE:` (followed by a space of two new-lines) in the
commit message:

.. code-block::

    refactor: <commit message>
    
    BREAKING CHANGE:
    
    <description of breaking change>

You can optionally add a scope as well.

Not that in the case of a breaking release the message type (here
``refactor``) can be any valid type.

Typical changes
================================================================================

Updated dependencies
--------------------------------------------------------------------------------

If you are manually updating dependencies in a library, you should
commit the change as a fix, so that consumers are also using the updated
dependencies.

Refactoring
--------------------------------------------------------------------------------

If you do a pure refactoring of a library without changing the features
and the public API **but** want to use the refactored version in your
consumers, commit the refactoring as a feature. After all, you are
improving the library which qualifies as a feature, e.g. it could be a
performance-improvement.

How releases are published
================================================================================

After you have pushed your changes to the remote repository, a job will
be run on the CI runner. If the job completes successfully (e.g. if all
tests pass and the linter does not report any errors),
``semantic-release`` will determine the next version to be
released.

The *"highest"* commit will *win* (``fix`` >
``feat`` > ``breaking change``). This means if the
list of commit messages since the last release contains *only*
fixes, the patch version will be incremented (:code:`2.3.4 ->
2.3.5`). If the list of commits contains at least one new
feature, then the minor version will be incremented and the patch
version will be set to ``0`` (``2.3.4 -> 2.4.0``).
If the list of commits contains at least one breaking change, then the
major version will be incremented and the minor and patch versions will
be set to ``0`` (``2.3.4 -> 3.0.0``).
